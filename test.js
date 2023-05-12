const ping = async () => {
  const data = await fetch('https://eshop.svetluska.cz/fotografie/max/oko-kabelove-4-2-0-5-2mm-3886202.jpg').then(response =>  response.headers.get("content-length") == 0)
  console.log(data)
}

ping()
