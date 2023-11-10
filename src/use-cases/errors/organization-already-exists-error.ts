export class OrganizationAlreadyExistsError extends Error {
  constructor() {
    super('E-mail or organization name or WhatsApp number already exists.')
  }
}
