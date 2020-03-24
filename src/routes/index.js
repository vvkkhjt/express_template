const express = require('express');
const router = express.Router();
const { T_JOB } = require("../db/server")

router.get('/job', async (req, res, next) => {
  const { limit = 10,page = 1 } = req.query
  try{
    const jobs = await T_JOB.find(null,{ __v: 0 },{ limit: Number(limit), skip: Number(limit * (page - 1)) })
    const total = await T_JOB.count()
    res.rawData = {
      data: {
        jobs,
        total
      }
    }
    next()
  }catch(e){
    next(e.message)
  }
})

router.post('/job', async (req, res, next) => {
  let { appName,
        appType,
        org,
        group,
        gitUrl,
        gitBranch,
        isDev,
        devEnv,
        qaEnv,
        prodEnv } = req.body

  try{
    const count = await T_JOB.count({ appName })
    if(count >= 1){
      res.rawData = {
        data: "项目名已存在"
      }
    }else{
      let data = {
        appName,
        appType,
        org,
        group,
        gitUrl,
        gitBranch,
        k8sNamespaces: {
          qa: `${org}-${group}-qa`,
          prod: `${org}-${group}-prod`
        },
        k8sEnv: {
          qa: qaEnv,
          prod: prodEnv
        }
      }
    
      if(isDev){
        data.k8sNamespaces.dev = `${org}-${group}-dev`
        data.k8sEnv.dev = devEnv
      }
    
      await T_JOB.create(data)
      res.rawData = {
        data: "创建成功"
      }
    }
    next()
  }catch(e){
    next(e.message)
  }
});

module.exports = router;
