(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const state = { mode: "pdf-word", file: null, output: null, outputName: "", lang: "ar", busy: false };
  const dict = {
    ar: {
      eyebrow:"أدوات مستندات مجانية وسهلة",headline:'ملفاتك تتحوّل، <span>بكل بساطة.</span>',subheadline:"حوّل PDF إلى Word أو Word إلى PDF في ثوانٍ. بدون حساب، وبدون رسوم، مع معالجة ملفاتك داخل متصفحك.",
      trust1:"مجاني دائمًا",trust2:"بدون تسجيل",trust3:"خصوصية أفضل",workspace:"مساحة التحويل",chooseDirection:"اختر نوع التحويل",localBadge:"معالجة على جهازك",
      pdfToWord:"PDF إلى Word",editableDoc:"ملف DOCX قابل للتعديل",wordToPdf:"Word إلى PDF",shareReady:"ملف PDF جاهز للمشاركة",
      dropTitle:"اسحب ملفك وأفلته هنا",dropSubtitle:"أو اختر ملفًا من جهازك — الحد الأقصى المقترح 25 MB",browse:"اختيار ملف",preparing:"جارٍ تجهيز الملف...",privacyShort:"ملفاتك لا تُرفع إلى خادمنا.",convert:"ابدأ التحويل",done:"اكتمل التحويل بنجاح",download:"تنزيل الملف",
      finePrint:"قد يختلف التنسيق النهائي حسب تعقيد الملف. ملفات PDF الممسوحة ضوئيًا والصور تحتاج إلى OCR، وهذه النسخة تعتمد على النص القابل للاستخراج.",
      adLabel:"مساحة إعلانية",adTitle:"إعلانك قد يظهر هنا",adDesc:"نحافظ على مساحة واضحة للإعلانات دون تعطيل تجربة التحويل.",
      feature1Title:"سهل وسريع",feature1Text:"خطوات قليلة من اختيار الملف إلى تنزيل النتيجة.",feature2Title:"خصوصيتك أولًا",feature2Text:"تتم المعالجة محليًا في المتصفح دون رفع ملفاتك.",feature3Title:"مجاني بلا حساب",feature3Text:"استخدم الأدوات دون تسجيل أو اشتراك.",
      help:"معلومات مهمة",faqTitle:"أسئلة شائعة",q1:"هل الموقع مجاني؟",a1:"نعم، التحويل متاح مجانًا ولا يتطلب إنشاء حساب.",q2:"هل يتم حفظ ملفاتي؟",a2:"تتم معالجة الملفات داخل متصفحك، ولا يرسل هذا الموقع ملفاتك إلى خادم خاص به. تبقى مسؤولًا عن الجهاز والمتصفح الذي تستخدمه.",q3:"هل يحتفظ Word بنفس تنسيق PDF؟",a3:"تتم إعادة بناء النصوص والفقرات. قد لا ينتقل التخطيط المعقد أو الأعمدة أو الجداول أو الخطوط بدقة كاملة.",
      footerText:"أدوات بسيطة تساعدك على إنجاز المزيد.",privacyLink:"الخصوصية",aboutLink:"عن الموقع",pdfFormat:"يدعم ملفات PDF",wordFormat:"يدعم ملفات DOCX",fileTooLarge:"حجم الملف أكبر من 25 MB. اختر ملفًا أصغر.",wrongType:"نوع الملف غير مناسب لهذا التحويل.",selectFile:"اختر ملفًا أولًا.",missingLib:"تعذر تحميل إحدى مكتبات التحويل. تحقق من اتصال الإنترنت ثم أعد تحميل الصفحة.",pdfError:"تعذر قراءة ملف PDF. قد يكون تالفًا أو محميًا بكلمة مرور.",noText:"لم يتم العثور على نص قابل للاستخراج. يبدو أن الملف ممسوح ضوئيًا ويحتاج إلى OCR غير متوفر في هذه النسخة.",convertError:"حدث خطأ أثناء التحويل. جرّب ملفًا آخر أو ملفًا أبسط.",privacyTitle:"الخصوصية",privacyText:"تتم معالجة ملفات التحويل داخل متصفحك باستخدام مكتبات JavaScript. لا يتضمن الموقع خادمًا لرفع الملفات أو تخزينها. قد يتم تحميل مكتبات التشغيل والخطوط من شبكات توزيع المحتوى الخارجية.",aboutTitle:"عن الموقع",aboutText:"PDF Word Converter أداة مجانية مستقلة لتحويل المستندات. جودة التحويل تعتمد على بنية الملف الأصلي؛ راجع الملف الناتج قبل استخدامه رسميًا."
    },
    en: {
      eyebrow:"Free and simple document tools",headline:'Your files, <span>made simple.</span>',subheadline:"Convert PDF to Word or Word to PDF in seconds. No account, no fees, with file processing in your browser.",
      trust1:"Always free",trust2:"No sign-up",trust3:"Privacy-minded",workspace:"CONVERSION WORKSPACE",chooseDirection:"Choose a conversion",localBadge:"On-device processing",
      pdfToWord:"PDF to Word",editableDoc:"Editable DOCX document",wordToPdf:"Word to PDF",shareReady:"PDF ready to share",
      dropTitle:"Drag and drop your file",dropSubtitle:"Or choose a file from your device — suggested maximum 25 MB",browse:"Choose file",preparing:"Preparing your file...",privacyShort:"Your files aren't uploaded to our server.",convert:"Start conversion",done:"Conversion completed",download:"Download file",
      finePrint:"Final formatting may vary with document complexity. Scanned PDFs and images require OCR; this version works with extractable text.",
      adLabel:"ADVERTISEMENT",adTitle:"Your ad could appear here",adDesc:"A clearly marked ad space that does not interrupt conversion.",
      feature1Title:"Simple and quick",feature1Text:"A few steps from selecting a file to downloading the result.",feature2Title:"Privacy first",feature2Text:"Processing happens locally in your browser.",feature3Title:"Free, no account",feature3Text:"Use the tools without signing up or subscribing.",
      help:"GOOD TO KNOW",faqTitle:"Frequently asked questions",q1:"Is this website free?",a1:"Yes. Conversion is free and does not require an account.",q2:"Are my files stored?",a2:"Files are processed in your browser and are not sent to this site's server. You remain responsible for your device and browser.",q3:"Will Word preserve the exact PDF layout?",a3:"Text and paragraphs are reconstructed. Complex layouts, columns, tables and fonts may not be reproduced exactly.",
      footerText:"Simple tools to help you get more done.",privacyLink:"Privacy",aboutLink:"About",pdfFormat:"PDF files supported",wordFormat:"DOCX files supported",fileTooLarge:"File is larger than 25 MB. Please choose a smaller file.",wrongType:"This file type is not supported for the selected conversion.",selectFile:"Please choose a file first.",missingLib:"A conversion library could not load. Check your internet connection and reload the page.",pdfError:"Could not read this PDF. It may be damaged or password-protected.",noText:"No extractable text was found. This appears to be a scanned PDF and needs OCR, which is not included in this version.",convertError:"Conversion failed. Try another or a simpler file.",privacyTitle:"Privacy",privacyText:"Files are processed in your browser using JavaScript libraries. This site does not include a server that uploads or stores your files. Runtime libraries and fonts may load from external content delivery networks.",aboutTitle:"About",aboutText:"PDF Word Converter is a free independent document conversion tool. Output quality depends on the original file; review converted documents before official use."
    }
  };
  const t = (key) => dict[state.lang][key] || key;
  const setText = (id, key) => { const el=$(id); if(el) el.textContent=t(key); };
  function updateMode(mode) {
    state.mode=mode; state.file=null; state.output=null;
    document.querySelectorAll(".mode").forEach(b=>{const active=b.dataset.mode===mode;b.classList.toggle("active",active);b.setAttribute("aria-selected",String(active));});
    $("fileInput").accept=mode==="pdf-word"?".pdf,application/pdf":".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    $("formatNote").textContent=t(mode==="pdf-word"?"pdfFormat":"wordFormat");
    $("dropzone").classList.remove("hidden"); $("filePanel").classList.add("hidden"); $("resultBox").classList.add("hidden"); $("errorBox").classList.add("hidden"); $("progressWrap").classList.add("hidden"); $("convertBtn").disabled=true;
  }
  function setLanguage(lang) {
    state.lang=lang; document.documentElement.lang=lang; document.documentElement.dir=lang==="ar"?"rtl":"ltr";
    $("langToggle").textContent=lang==="ar"?"English":"العربية";
    document.querySelectorAll("[data-i18n]").forEach(el=>{const key=el.dataset.i18n;if(dict[lang][key]) el.innerHTML=dict[lang][key];});
    $("formatNote").textContent=t(state.mode==="pdf-word"?"pdfFormat":"wordFormat");
  }
  function setFile(file) {
    $("errorBox").classList.add("hidden");
    if(!file){return;}
    const isPdf=file.type==="application/pdf"||file.name.toLowerCase().endsWith(".pdf");
    const isDocx=file.name.toLowerCase().endsWith(".docx");
    if((state.mode==="pdf-word"&&!isPdf)||(state.mode==="word-pdf"&&!isDocx)){showError(t("wrongType"));return;}
    if(file.size>25*1024*1024){showError(t("fileTooLarge"));return;}
    state.file=file;state.output=null;
    $("dropzone").classList.add("hidden");$("filePanel").classList.remove("hidden");$("resultBox").classList.add("hidden");
    $("fileName").textContent=file.name;$("fileSize").textContent=(file.size/1024/1024).toFixed(2)+" MB";
    $("fileSymbol").textContent=state.mode==="pdf-word"?"PDF":"DOCX";
    $("convertBtn").disabled=false;
  }
  function showError(message){$("errorBox").textContent=message;$("errorBox").classList.remove("hidden");}
  function progress(percent,message){$("progressWrap").classList.remove("hidden");$("progressBar").style.width=percent+"%";$("progressPercent").textContent=percent+"%";$("statusText").textContent=message;}
  const wait=(ms)=>new Promise(r=>setTimeout(r,ms));
  async function pdfToDocx(file) {
    if(!window.pdfjsLib||!window.docx) throw new Error(t("missingLib"));
    pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
    const data=new Uint8Array(await file.arrayBuffer());
    const pdf=await pdfjsLib.getDocument({data}).promise;
    const paragraphs=[];
    for(let i=1;i<=pdf.numPages;i++){
      progress(Math.round((i-1)/pdf.numPages*75),state.lang==="ar"?`استخراج نص الصفحة ${i} من ${pdf.numPages}`:`Extracting page ${i} of ${pdf.numPages}`);
      const page=await pdf.getPage(i);const content=await page.getTextContent();
      const lines=[];let current="",lastY=null;
      for(const item of content.items){
        if(!item.str) continue;
        const y=item.transform?item.transform[5]:null;
        if(lastY!==null&&y!==null&&Math.abs(y-lastY)>3){if(current.trim())lines.push(current.trim());current="";}
        current+=item.str+" ";lastY=y;
      }
      if(current.trim())lines.push(current.trim());
      if(lines.length){if(i>1) paragraphs.push(new docx.Paragraph({children:[new docx.TextRun({text:"",break:1})]}));lines.forEach(line=>paragraphs.push(new docx.Paragraph({text:line,bidirectional:/[\u0600-\u06FF]/.test(line),spacing:{after:120}})));}
      await wait(0);
    }
    if(!paragraphs.length) throw new Error(t("noText"));
    progress(85,t("preparing"));
    const doc=new docx.Document({sections:[{properties:{},children:paragraphs}]});
    const blob=await docx.Packer.toBlob(doc);
    return {blob,name:file.name.replace(/\.pdf$/i,"")+".docx"};
  }
  async function wordToPdf(file) {
    if(!window.mammoth||!window.html2pdf) throw new Error(t("missingLib"));
    const arrayBuffer=await file.arrayBuffer();
    progress(20,t("preparing"));
    const result=await mammoth.convertToHtml({arrayBuffer});
    const html=result.value;
    if(!html.trim()) throw new Error(t("convertError"));
    const wrapper=document.createElement("div");
    wrapper.dir=/[\u0600-\u06FF]/.test(html)?"rtl":"ltr";
    wrapper.style.cssText="font-family:Cairo,Arial,sans-serif;color:#111;background:#fff;padding:24px;width:750px;direction:"+wrapper.dir+";line-height:1.7;font-size:14px;overflow-wrap:anywhere";
    wrapper.innerHTML=html;
    wrapper.querySelectorAll("table").forEach(table=>{table.style.borderCollapse="collapse";table.style.width="100%";table.querySelectorAll("td,th").forEach(c=>{c.style.border="1px solid #aaa";c.style.padding="6px";});});
    wrapper.querySelectorAll("img").forEach(img=>{img.style.maxWidth="100%";});
    document.body.appendChild(wrapper);
    progress(55,t("preparing"));
    try {
      const opt={margin:10,filename:"converted.pdf",image:{type:"jpeg",quality:.96},html2canvas:{scale:1.6,useCORS:true,backgroundColor:"#ffffff",logging:false},jsPDF:{unit:"mm",format:"a4",orientation:"portrait"},pagebreak:{mode:["css","legacy"]}};
      const blob=await html2pdf().set(opt).from(wrapper).outputPdf("blob");
      return {blob,name:file.name.replace(/\.docx$/i,"")+".pdf"};
    } finally {wrapper.remove();}
  }
  async function convert() {
    if(!state.file||state.busy)return;
    state.busy=true;$("convertBtn").disabled=true;$("errorBox").classList.add("hidden");$("resultBox").classList.add("hidden");
    try {
      progress(5,t("preparing"));
      const result=state.mode==="pdf-word"?await pdfToDocx(state.file):await wordToPdf(state.file);
      state.output=result.blob;state.outputName=result.name;
      progress(100,t("done"));$("resultName").textContent=result.name;$("resultBox").classList.remove("hidden");
    } catch(err) {showError(err.message||t("convertError"));$("progressWrap").classList.add("hidden");}
    finally {state.busy=false;$("convertBtn").disabled=false;}
  }
  function download() {
    if(!state.output)return;
    const url=URL.createObjectURL(state.output);const a=document.createElement("a");a.href=url;a.download=state.outputName;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);
  }
  $("chooseFile").addEventListener("click",e=>{e.stopPropagation();$("fileInput").click();});
  $("dropzone").addEventListener("click",e=>{if(e.target.id!=="chooseFile")$("fileInput").click();});
  $("dropzone").addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();$("fileInput").click();}});
  $("fileInput").addEventListener("change",e=>setFile(e.target.files[0]));
  ["dragenter","dragover"].forEach(ev=>$("dropzone").addEventListener(ev,e=>{e.preventDefault();$("dropzone").classList.add("dragover");}));
  ["dragleave","drop"].forEach(ev=>$("dropzone").addEventListener(ev,e=>{e.preventDefault();$("dropzone").classList.remove("dragover");}));
  $("dropzone").addEventListener("drop",e=>setFile(e.dataTransfer.files[0]));
  document.querySelectorAll(".mode").forEach(b=>b.addEventListener("click",()=>updateMode(b.dataset.mode)));
  $("removeFile").addEventListener("click",()=>{$("fileInput").value="";state.file=null;state.output=null;$("filePanel").classList.add("hidden");$("dropzone").classList.remove("hidden");$("resultBox").classList.add("hidden");$("progressWrap").classList.add("hidden");$("convertBtn").disabled=true;});
  $("convertBtn").addEventListener("click",convert);$("downloadBtn").addEventListener("click",download);
  $("langToggle").addEventListener("click",()=>setLanguage(state.lang==="ar"?"en":"ar"));
  $("themeToggle").addEventListener("click",()=>{document.body.classList.toggle("light");$("themeIcon").textContent=document.body.classList.contains("light")?"☀":"☾";});
  function openModal(title,text){$("modalTitle").textContent=title;$("modalText").textContent=text;$("infoModal").classList.remove("hidden");}
  $("privacyLink").addEventListener("click",e=>{e.preventDefault();openModal(t("privacyTitle"),t("privacyText"));});
  $("aboutLink").addEventListener("click",e=>{e.preventDefault();openModal(t("aboutTitle"),t("aboutText"));});
  $("modalClose").addEventListener("click",()=>$("infoModal").classList.add("hidden"));
  $("infoModal").addEventListener("click",e=>{if(e.target===$("infoModal"))$("infoModal").classList.add("hidden");});
  $("year").textContent=new Date().getFullYear();
  setLanguage("ar");updateMode("pdf-word");
})();