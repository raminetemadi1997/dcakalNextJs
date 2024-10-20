
import axios from "@/lib/axios";
import { notFound , redirect } from 'next/navigation';


export async function getGlobalPageMetadata(routeApi) {
    const metaData = await axios.get(routeApi, { cache: false }).then((res) => res)
    return metaData ;
}

export async function getHomeData() {
    const home = await axios.get('api/home', { cache: false }).then((res) => res).catch(() => redirect(notFound()));
    return home ;
}

export async function menuApi() {
    const menuData = await axios.get('api/boot-menu-api', { cache: false }).then((res) => res).then((res) => res).catch(() => redirect(notFound()))
    return menuData ;
}

export async function getSsrData(routeApi) {
    const data = await axios.get(routeApi, { cache: false }).then((res) => res).then((res) => res).catch(() => redirect(notFound()))
    return data ;
}




// export async function getUser() {
//     const data = await fetch("https://final.dca-kala.com/api/user").then((res) => res).catch(error=>{redirect("/login")})
//     return data ;
// }




