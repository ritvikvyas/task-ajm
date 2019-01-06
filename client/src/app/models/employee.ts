import { BonusPlan } from './bonus_plan';

export class Employee {
  _id: string;
  firstName: string;
  lastName: string;
  dob: Date;
  department: string;
  basicSalary: number;
  designation: string;
  bonusPlan: BonusPlan;
  created_at: Date;
}
