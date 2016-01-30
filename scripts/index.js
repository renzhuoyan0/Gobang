window.onload=function(){
	var chessboard=document.getElementById('chessboard');
	var row=15,kaiguan=true,dict1={},dict2={};
	for (var i = 0; i < row; i++) {
		var hangxian=document.createElement('div');
		hangxian.style.width='600px';
		hangxian.style.height='1px';
		hangxian.style.position='absolute';
		hangxian.style.top=Math.floor( 600/row/2+600/row*i );
		hangxian.style.left='0';
		hangxian.style.background='#fff';
		chessboard.appendChild(hangxian);

		var shuxian=document.createElement('div');
		shuxian.style.height='600px';
		shuxian.style.width='1px';
		shuxian.style.position='absolute';
		shuxian.style.left=Math.floor( 600/row/2+600/row*i );
		shuxian.style.top='0';
		shuxian.style.background='#fff';
		chessboard.appendChild(shuxian);
	}
	for (var i = 0; i < row; i++) {
		for (var j = 0; j < row; j++) {
			var chess=document.createElement('div');
			chess.setAttribute('class','chess');
			chess.setAttribute('id',i+'_'+j);

			wid=Math.floor(600/row)+'px';
			chess.style.width=wid;
			chess.style.height=wid;
			chessboard.appendChild(chess);
		}
	}
	var chesss=document.getElementsByClassName('chess');
	for (var i = 0; i < chesss.length; i++) {
		chesss[i].onclick=function(){
			if(kaishi.style.display == "none"){
			var id=this.getAttribute('id');			
			if (this.hasAttribute('hascolor')) {
				return;
			}
			if (kaiguan) {
				this.style.background='url("./images/white.png")';
				// this.style.boxShadow='0 0 3px black';
				kaiguan=false;
				dict1[id]=true;
				if ( panduan(id,dict1) ) {
					kaishi.style.display = 'block';
					kaishi.innerHTML = '白子赢了!';
					kaishi.onclick = function(){
						location.reload()
					}
				}
			}else {
				this.style.background='url("./images/black.png")';
				// this.style.boxShadow='0 0 3px white';
				kaiguan=true;
				dict2[id]=true;
				if ( panduan(id,dict2) ) {
					kaishi.style.display = 'block';
					kaishi.innerHTML = '黑子赢了!';
					kaishi.onclick = function(){
						location.reload()
					}
				}
			}
			this.setAttribute('hascolor','true');
			}
		};
	}

	var panduan=function(id,dict){
		var xx=Number(id.split('_')[0]);
		var yy=Number(id.split('_')[1]);
		var tx,ty;
		var zx=1;
		tx=xx;ty=yy;
		while(dict[(tx-1)+'_'+(ty+1)]){zx++;tx--;ty++;}
		tx=xx;ty=yy;
		while(dict[(tx+1)+'_'+(ty-1)]){zx++;tx++;ty--;}
		if (zx>=5) { return true;}

		var yx=1;
		tx=xx;ty=yy;
		while(dict[(tx-1)+'_'+(ty-1)]){yx++;tx--;ty--;}
		tx=xx;ty=yy;
		while(dict[(tx+1)+'_'+(ty+1)]){yx++;tx++;ty++;}
		if (yx>=5) { return true;}

		var shu=1;
		tx=xx;ty=yy;
		while(dict[(tx-1)+'_'+ty]){shu++;tx--;}
		tx=xx;ty=yy;
		while(dict[(tx+1)+'_'+ty]){shu++;tx++;}
		if (shu>=5) { return true;}

		var heng=1;
		tx=xx;ty=yy;
		while(dict[tx+'_'+(ty-1)]){heng++;ty--;}
		tx=xx;ty=yy;
		while(dict[tx+'_'+(ty+1)]){heng++;ty++;}
		if (heng>=5) { return true;}

	};
	var kaiguan1 = true;
	first.onclick = function(){
		if(kaiguan1){
			this.innerHTML = '开始';
			kaiguan1 = false;	
		}else{
			this.innerHTML = '准备';
			kaiguan1 = true;
		}
		
	}
	var kaiguan2 = true;
	second.onclick = function(){
		if(kaiguan2){
			this.innerHTML = '开始';	
			kaiguan2 = false;
		}else{
			this.innerHTML = '准备';
			kaiguan2 = true;
		}
		
	}
	var timerId = setInterval(function(){
		if(kaiguan1==false&&kaiguan2==false){
			kaishi.innerHTML = "游戏开始";
			first.style.display='none';
			second.style.display='none';
			kaiguan1 = true;
			kaiguan2 = true;
			setTimeout(function(){
				kaishi.style.display ='none';
			},1000)
		}
	},300)
	

};