export class PetNotFoundError extends Error {
  constructor() {
    super('No pets found for the filters provided.')
  }
}
