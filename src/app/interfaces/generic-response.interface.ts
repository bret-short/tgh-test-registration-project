export interface GenericResponse {
  payload: any;
  message: string | null;
  error: any | null;
  success: boolean;
}
