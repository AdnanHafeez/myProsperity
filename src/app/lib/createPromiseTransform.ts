function createTransform (inbound, outbound, config = {}) {
  let whitelist = (config as any).whitelist || null
  let blacklist = (config as any).blacklist || null

  function whitelistBlacklistCheck (key) {
    if (whitelist && whitelist.indexOf(key) === -1) return true
    if (blacklist && blacklist.indexOf(key) !== -1) return true
    return false
  }

  return {
    in: (state, key) => {

      return !whitelistBlacklistCheck(key) && inbound ? inbound({inboundState: state,key}) : Promise.resolve({inboundState: state,key})
    },
    out: (state, key) => {
     
        return !whitelistBlacklistCheck(key) && outbound ? outbound({outboundState: state,key}) : Promise.resolve({outboundState: state,key})
    }
  }
}

export default createTransform
