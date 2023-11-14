export class IncompleteDataError extends Error {
  constructor() {
    super('Incomplete pet informations.')
  }
}
