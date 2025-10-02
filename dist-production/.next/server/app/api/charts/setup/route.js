"use strict";(()=>{var e={};e.id=19,e.ids=[19],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},2615:e=>{e.exports=require("http")},8791:e=>{e.exports=require("https")},8621:e=>{e.exports=require("punycode")},6162:e=>{e.exports=require("stream")},7360:e=>{e.exports=require("url")},1568:e=>{e.exports=require("zlib")},1158:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>_,patchFetch:()=>x,requestAsyncStorage:()=>u,routeModule:()=>d,serverHooks:()=>l,staticGenerationAsyncStorage:()=>h});var a={};r.r(a),r.d(a,{POST:()=>p});var s=r(9303),n=r(8716),i=r(670),c=r(7070);let o=(0,r(4738).eI)("https://eeojgpxugehjidamxgbz.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlb2pncHh1Z2VoamlkYW14Z2J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxNjgxMDMsImV4cCI6MjA3NDc0NDEwM30.D9_9zXpcvBn_XDuoW-FXFVL00R9tmuTwPZ2Itjvp5Ks");async function p(e){try{let{data:e,error:t}=await o.from("enhanced_charts").select("*").limit(1);if(t&&t.message.includes("does not exist"))return c.NextResponse.json({success:!1,error:"enhanced_charts table does not exist. Please create it via Supabase dashboard.",sql:`
CREATE TABLE enhanced_charts (
    id BIGSERIAL PRIMARY KEY,
    state VARCHAR(255) NOT NULL,
    chart_type VARCHAR(100) NOT NULL,
    data_points INTEGER NOT NULL,
    chart_data JSONB,
    statistical_analysis JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (state, chart_type, data_points)
);

CREATE INDEX idx_enhanced_charts_state ON enhanced_charts(state);
CREATE INDEX idx_enhanced_charts_type ON enhanced_charts(chart_type);
CREATE INDEX idx_enhanced_charts_updated ON enhanced_charts(updated_at);
        `});return c.NextResponse.json({success:!0,message:"enhanced_charts table exists and is accessible",data:e})}catch(e){return console.error("Error checking enhanced_charts table:",e),c.NextResponse.json({error:"Internal server error",details:e instanceof Error?e.message:"Unknown error"},{status:500})}}let d=new s.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/charts/setup/route",pathname:"/api/charts/setup",filename:"route",bundlePath:"app/api/charts/setup/route"},resolvedPagePath:"/var/www/ai-projects/presidential-elections/src/app/api/charts/setup/route.ts",nextConfigOutput:"standalone",userland:a}),{requestAsyncStorage:u,staticGenerationAsyncStorage:h,serverHooks:l}=d,_="/api/charts/setup/route";function x(){return(0,i.patchFetch)({serverHooks:l,staticGenerationAsyncStorage:h})}}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[276,972,738],()=>r(1158));module.exports=a})();