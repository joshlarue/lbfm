'use server'
export async function signup(formData) {

  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');
  console.log(name, email, password);
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);

    // call DB to create a user

}