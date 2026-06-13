const vscode= require('vscode');
const { execFile }=  require('child_process');
 const path = require('path');
 const fs=require('fs') ;

// todo add supp. for various editor too

const script=path.join(__dirname,'tracker.py');
const htmlFile=path.join(__dirname,'panel.html');//call python so i get jasooon:}
function py(args){ return new Promise((resolve)=>{ execFile('py',[script, ...args],
  //i am a lil confused wht to use python3 or  py as my editor runs like py '.'.py

   (err,stdout)=>              { if(err){
    resolve ({error:err.message}); return
    ;}
    try{ (resolveJSON.parse(stdout));}
    catch {resolve({error;'py broke jasdfasdjasdfasjd'});}});});}


    //things are broken here i see later now work html templateing
function buildPanel(data){
    let html=fs.readFileSync(htmlFile,utf8);
    if(data.error){
        html=html.replace('HOURS_HERE','error')
        html=html.replace('GOALS_HERE',`<P STYLE="COLOR:TOMATO">${data.error}</P>`);
        return html;
    } 
    const hrs=data.hours!= null ?data.hours + ' hrs':'check keys';
    html=html.replace('HOURS_HERE;,hrs);
        if (!data.goals.length){
            html =html.replace('GOALS_HERE','<P ID="EMPTY">NO GOals yet,why:}?</p>');
            return html;}
            let goals='';
            for (let g of data.goals){
                const tick=g.checked? '✅' :'⬜' ;//i thoght trying color method but that was jus very unproductive  so  i  jus   use th e  emojis
                const cls=g.checked  ? 'done': 'notdone';
                goals+=   `<p class ="goal  ${cls}">${tick}  ${g.label} -${g.hours}hrs</p>\n`;}//honestly fo  rthis  par ti am using  ai assistanc e  as this  is  v ery  tricky not the logic loop but   th e  classes  sorry
                html=html.replace('GOALS_HERE',goals);
                return  html;
            } 
    function activate(ctx){ctx.subscriptions.push(vscode.commands.registerCommand('tracker.setKey',async() => {
        const k=await vscode.window.showInputBox({prompt:'wakatime/hackatime api key'});
        if (!k) return;
        await py(['setkey',k]);
        vscode.window.showInformationMessage('saved!');})); 
        ctx.subscriptions.push(vscode.commands.registerCommand('tracker.addGoal',async()=>{
            const name=await vscode.window.showInputBox({prompt:'goal name?'});
            if (!name) return;
            const hrs= await vscode.window.showInputBox({prompt:'hours needed?'});
            if (!hrs || isNaN(parseFloat(hrs)))){
                vscode.window.showErrorMessage('not a number jasdfajsdafasdjasd');
return;
            }
            await py(['add',name,hrs]);
            vscode.window.showInformationMessage('added: ' + name);}));
            ctx.subscriptions.push(vscode.commands.registerCommand
                ('tracker.clearGoals', async()=>{
                    await py(['clear']);
                    vscode.window.showInformationMessage('cleared!!');
                }));
  ctx.subscriptions.push(vscode.commands.registerCommand('tracker.show',async ()=>{
    const panel=vscode.window.createWebviewPanel('tracker','hour tracker',vscode.ViewColumn.One, {}
    );
    const data=await py(['status'])
    panel.webview.html=buildPanel(data);
  }));

}

                
                
 //11:28               
                function deactivate() {}
                Module.exports = {activate, deactivate};


             

