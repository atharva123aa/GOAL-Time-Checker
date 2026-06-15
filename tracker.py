import json as j
import sys
import os
import urllib.request as u
#js callings

data_file=os.path.join(os.path.dirname(os.path.abspath(__file__)),"data.json")#claude told me to use abspath as directory brealsorry next time i will try myself
def load():
    if not os.path.exists(data_file):
        return {"api_key":"","goals":[]}
    f=open(data_file,"r")
    d=j.load(f)#i am gonna addmore in data.jasooon in next ver.
    f.close()
    return d
def save(d):
    f=open(data_file,"w")
    j.dump(d,f,indent=2)
    f.close()
def fetch_hours(key):
    import base64 as b
    url="https://wakatime.com/api/v1/users/current/all_time_since_today"
    try:
        token=b.b64encode(key.encode()).decode()
        req=u.Request(url)
        req.add_header("Authorization","Basic" +token )
        res=u.urlopen(req,timeout=10)
        body= j.loads(res.read())
        secs=body["data"]["total_seconds"]
        return  round(secs/ 3600,1)
    except:
        return None

    
    
       #this from orignal doc
   
        #prob.wrong key or no net  


cmd=sys.argv[1] if len(sys.argv) > 1 else""  #todo divorce from ternary operators .very confusing}:
if cmd=="status":
    d=load()
    hours=fetch_hours(d["api_key"]) if d["api_key"] else None
#pr
    

    goals=[]
    for g in d["goals"]:
        checked=hours != None and hours >= g["hours"]
        goals.append({
            "label": g["label"],
            "hours":g["hours"],
        
            "checked": checked
        })
        #sort em up by hours 
    goals.sort(key=lambda x: x["hours"]
    )
    print(j.dumps({"hours":hours ,"goals":goals}))
elif cmd=="add":
    label=sys.argv[2]
    hrs= float(sys.argv[3])
    d=load()
    d["goals"].append({"label": label, "hours":hrs})
    save(d)
    print(j.dumps({"ok":True}))
elif cmd == "clear":
    d=load()
    d["goals"]=[]
    save(d)

    print(j.dumps({"ok": True}))
elif cmd=="setkey":
    d=load()
    d["api_key"]=sys.argv[2]
    save(d)
    print(j.dumps({"ok": True}))
else:
    print(j.dumps({"error":"unknown command"}))
