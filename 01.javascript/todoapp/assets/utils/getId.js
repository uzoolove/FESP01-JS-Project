export default function getId() {
  const urlStr = window.location.href;
  const url = new URL(urlStr);
  const urlparams = url.searchParams;
  return urlparams.get("_id");
}
