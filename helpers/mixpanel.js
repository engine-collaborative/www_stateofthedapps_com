export const trackCollectionView = function (sourceComponent, sourcePath, targetCollection) {
  let name = 'Collection - View'
  let data = {
    targetCollection
  }
  if (sourceComponent) { data = { ...data, sourceComponent } }
  if (sourcePath) { data = { ...data, sourcePath } }

  const action = {
    name,
    data
  }

  return action
}

export const trackDappView = function (sourceCollection, sourceComponent, sourcePath, targetDapp) {
  let name = 'DApp - View'
  let data = {
    targetDapp
  }
  if (sourceCollection) { data = { ...data, sourceCollection } }
  if (sourceComponent) { data = { ...data, sourceComponent } }
  if (sourcePath) { data = { ...data, sourcePath } }

  const action = {
    name,
    data
  }

  return action
}

export const trackHomeEventCta = function (targetCta) {
  let name = 'Home Event CTA'
  let data = {
    targetCta
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackHomeHeroCta = function (targetCta) {
  let name = 'Home Hero CTA'
  let data = {
    targetCta
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackHomeHeroDappIcon = function (targetIndex) {
  let name = 'Home Hero DApp Icon'
  let data = {
    targetIndex
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackMenu = function (sourcePath, targetMenuItem) {
  let name = 'Menu'
  let data = {
    sourcePath,
    targetMenuItem
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackMetamaskCta = function (sourceComponent, sourcePath) {
  let name = 'Metamask CTA'
  let data = {
    sourceComponent,
    sourcePath
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackNewsletterSubscribe = function (email, sourceComponent, sourcePath) {
  let name = 'Newsletter - Subscribe'
  let data = {
    email,
    sourceComponent,
    sourcePath
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackPageAbout = function (sourceComponent, sourcePageLocation, sourcePath) {
  let name = 'About page'
  let data = {
    sourceComponent,
    sourcePageLocation,
    sourcePath
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackPageTerms = function (sourceComponent, sourcePageLocation, sourcePath) {
  let name = 'Terms page'
  let data = {
    sourceComponent,
    sourcePageLocation,
    sourcePath
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackSocial = function (sourceComponent, sourcePageLocation, sourcePath, targetPlatform) {
  let name = 'Social'
  let data = {
    sourceComponent,
    sourcePageLocation,
    sourcePath,
    targetPlatform
  }

  const action = {
    name,
    data
  }

  return action
}
