export default class CustomError extends Error {
  private status: number;
  constructor(status: number, message?: string) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  public toJSON() {
    return {
      status: this.status,
      message: this.message
    };
  }
}
