export class PetNotExistingInDatabaseError extends Error {
  constructor() {
    // Super é um método de Error //
    super('Pet not found in Database.')
  }
}
