export default function getId() {
  const params = new URLSearchParams(location.search)
  return params.get('_id');
}
