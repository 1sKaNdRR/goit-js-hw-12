import{a as L,i as n,S as u}from"./assets/vendor-eded45c0.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const f=s=>s.reduce((t,{tags:o,webformatURL:a,largeImageURL:e,likes:r,views:l,comments:y,downloads:p})=>t+`<li class="photo-container">
    <a href=${e} class="card-link js-card-link">
        <img class="photo" src="${a}" alt="${o}" >
    </a>
    <div class="info">
        <div class="info-item">
            <span class="title">Likes</span>
            <span class="info">${r}</span>
        </div>
        <div class="info-item">
            <span class="title">Views</span>
            <span class="info">${l}</span>
        </div>
        <div class="info-item">
            <span class="title">Comments</span>
            <span class="info">${y}</span>
        </div>
        <div class="info-item">
            <span class="title">Downloads</span>
            <span class="info">${p}</span>
        </div>
    </div>
</li>
    `,""),v="36831131-bfb1c5890fc73f15a7de29d05",b="https://pixabay.com/api/",g=async(s,t)=>{const o={key:v,q:s,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:15,page:t};try{return(await L.get(b,{params:o})).data}catch{throw new Error("Sorry, there are no images matching your search query. Please try again!")}},h=document.querySelector(".gallery"),w=document.querySelector(".search-form"),m=document.querySelector("#main-loader"),i=document.querySelector(".load-more");document.querySelector("#load-more-loader");let c="",d=1;async function S(s){if(s.preventDefault(),c=s.target.elements.searchKeyword.value.trim(),h.innerHTML="",d=1,i.classList.add("is-hidden"),c==="")return n.error({message:"Sorry, there are no images matching your search query. Please try again!"});m.classList.remove("is-hidden");try{const t=await g(c,d);t.hits.length===0?n.error({message:"Sorry, there are no images matching your search query. Please try again!"}):(h.innerHTML=f(t.hits),new u(".gallery a",{captionsData:"alt",captionsDelay:250}).refresh(),t.hits.length===15&&i.classList.remove("is-hidden"))}catch(t){console.log(t),n.error({message:"Failed to fetch images. Please try again."})}finally{s.target.reset(),m.classList.add("is-hidden")}}async function q(){d+=1,i.classList.add("is-hidden"),document.getElementById("load-more-button-loader").classList.remove("is-hidden");try{const s=await g(c,d);if(s.hits.length===0)n.error({message:"We're sorry, but you've reached the end of search results."});else{const t=window.scrollY;h.insertAdjacentHTML("beforeend",f(s.hits)),new u(".gallery a",{captionsData:"alt",captionsDelay:250}).refresh();const a=document.querySelectorAll(".gallery li:nth-last-child(-n+15)");a.length>0&&a[0].scrollIntoView({behavior:"smooth"}),s.hits.length<15?(i.classList.add("is-hidden"),n.info({message:"We're sorry, but you've reached the end of search results."})):i.classList.remove("is-hidden")}}catch(s){console.log(s),n.error({message:"Failed to fetch images. Please try again."})}finally{document.getElementById("load-more-button-loader").classList.add("is-hidden"),i.disabled=!1}}w.addEventListener("submit",S);i.addEventListener("click",q);
//# sourceMappingURL=commonHelpers.js.map
