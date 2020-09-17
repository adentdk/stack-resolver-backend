import {Counter} from 'prom-client'
import config from './../config/config'

const hostname = config.metrics.dockerHost
const version = config.metrics.version
const sha = config.metrics.commitSha

const serviceHeartbeatCounter = new Counter({
  name: 'service_is_alive',
  help: 'Check if service is working.',
  labelNames: ['alive'],
})

const updateServiceStatus = () => {
  serviceHeartbeatCounter.inc({alive: hostname})
}

const serviceVersion = new Counter({
  name: 'service_version',
  help: 'Check service version.',
  labelNames: ['version'],
})

const serviceCommitSha = new Counter({
  name: 'service_commit_sha',
  help: 'Check service commit sha.',
  labelNames: ['commit_sha'],
})

const init = () => {
  serviceVersion.inc({version})
  serviceCommitSha.inc({commit_sha: sha})
}


export {
  updateServiceStatus,
  init
}
