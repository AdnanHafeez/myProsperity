function createTransform (inbound, outbound, config = {}) {
  let whitelist = (config as any).whitelist || null
  let blacklist = (config as any).blacklist || null

  function whitelistBlacklistCheck (key) {
    if (whitelist && whitelist.indexOf(key) === -1) return true
    if (blacklist && blacklist.indexOf(key) !== -1) return true
    return false
  }

  return {
    in: (state, key) => !whitelistBlacklistCheck(key) && inbound ? inbound(state, key) : Promise.resolve(state),
    out: (state, key) => !whitelistBlacklistCheck(key) && outbound ? outbound(state, key) : Promise.resolve(state)
  }
}

export default createTransform
