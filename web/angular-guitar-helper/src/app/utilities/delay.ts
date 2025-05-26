export function delayAwait(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
