'use server';

import { hash } from 'bcrypt';

// import { signIn } from '@/lib/auth';

// export const login = async (email: string, passwd: string) => {
//   await signIn(service);
// };
export async function hashPassword(passwd: string) {
  return hash(passwd, 10);
  // const hashedPassword = await hash(passwd, 10);
  // console.log('🚀  hashedPassword:', hashedPassword);
  // return hashedPassword;
}
