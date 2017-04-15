var sbSize;
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    _rootNode: null,
    _widget: null,

    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        var size = cc.winSize;

        this.m_timer = 120;

        this._rootNode = cc.Node.create();
        this.addChild(this._rootNode);
        //read widget
        this._widget=ccs.uiReader.widgetFromJsonFile(res.uiLayer_json);

        this._rootNode.addChild(this._widget);

        this.djs_fen = ccui.helper.seekWidgetByName(this._widget, "daojishi-fen");
        this.djs_miao = ccui.helper.seekWidgetByName(this._widget, "daojishi-miao");

        this.djs_fen.setProperty("03", res.number_png, 16, 22, "0");
        var timeSize = this.djs_fen.getContentSize();
        this.djs_fen.setScale(238/timeSize.width,200/timeSize.height);
        this.djs_fen.x = timeSize.width/2+100;
        this.djs_fen.y = timeSize.height/2+350;

        this.djs_miao.setProperty("00", res.number_png, 16, 22, "0");
        this.djs_miao.setProperty("03", res.number_png, 16, 22, "0");
        var timeSize1 = this.djs_miao.getContentSize();
        this.djs_miao.setScale(1138/timeSize1.width,1000/timeSize1.height);


        this.scheduleUpdate();

        return true;
    },
    update:function(dt){
        this.daojishi(dt);
    },
    daojishi:function(dt){
//        float m_timer;
        this.m_timer-=dt;

        var time = this.m_timer;

//计算多杀秒
        var miao = time%60;
        time/= 60;
//多少分钟
        var fen = time%60;
        time/= 60;
//多少小时
        var xiaoshi = time%24;

//多杀天
        var tian = time/24;

//        cc.log("%d天%d小时%d分钟%d秒",tian,xiaoshi,fen,miao);
//        cc.log("%d天%d小时%d分钟%d秒",parseInt(fen),parseInt(miao));
        miao = parseInt(miao);
        fen = parseInt(fen);

        if(fen<10){
           this.djs_fen.setProperty("0"+fen, res.number_png, 16, 22, "00");
        }
        else{
            this.djs_fen.setProperty(fen, res.number_png, 16, 22, "00");
        }
        if(miao<10){
            this.djs_miao.setProperty("0"+miao, res.number_png, 16, 22, "000");
        }
       else{
            this.djs_miao.setProperty(miao, res.number_png, 16, 22, "000");
        }

    }

});


