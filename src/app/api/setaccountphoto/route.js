export async function POST(req, res) {
  const formData = await req.formData();
  console.log(formData.get('accountPhoto'));
}