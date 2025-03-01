export type RootStackParamList = {
  Login: undefined;
  List: undefined;
  PatientList: undefined;
  ReadyForOT: undefined;
  Detail: { patient: Patient };
  ProcedurePlanningForm: { patientId: string };
  SignInForm: { patientId: string };
  SignOutForm: { patientId: string };
};

export interface Patient {
  PatientId: string;
  PatientName: string;
  dateOfBirth: string;
  gender: string;
  ward: string;
  referringPhysician: string;
  createdAt: string;
}
