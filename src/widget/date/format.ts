export const formatDate = (date:Date)=>{
    let tanggal = date.getDate().toString();
    let bulan = (date.getMonth() + 1).toString();
    let tahun = date.getFullYear().toString();

    if (date.getDate() < 10) tanggal = '0' + tanggal;
    if (date.getMonth() + 1 < 10) bulan = '0' + bulan;
    if (date.getFullYear() < 10) tahun = '0' + tahun;

    return tahun+"-"+bulan+"-"+tanggal
}