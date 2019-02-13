export default class CustomError extends Error {
  private status: number;
  private details?: string;
  constructor(status: number, message: string, details?: string) {
    super(message);
    this.status = status;
    this.details = details;
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  public toJSON() {
    return {
      details: this.details,
      message: this.message,
      status: this.status
    };
  }
}
