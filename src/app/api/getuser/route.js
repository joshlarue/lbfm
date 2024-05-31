export default async function POST(req, res) {
  const formData = await req.formData();
  const reqUsername = formData.get(reqUsername);
  console.log(reqUsername);
}
