export function waitForPendingPromises() {
  //TODO: This 4 is weird, because this methods should wait for everything that is in the Promise queue
  let ret = new Promise(resolve => setTimeout(resolve, 5));

  return ret;
}