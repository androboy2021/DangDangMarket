$(document).ready(function () {
    
    $(document).ready(function(){ 
        let index;
        $(".list-group-item").on({ // 그룹 이벤트 등록 : 이벤트 대상요소에 2개 이상의 이벤트를 등록 가능
            "mouseover" : function(){ // 선택한 요소에 마우스 포인터를 올릴 때마다 이벤트를 발생
                index = $(this).data("id");
                // 선택한 요소중 지정한 인덱스만 참조해서 css 속성중 배경 색상으로 light-gray 색으로 변경
                $(".list-group li").eq(index-1).css({"background-color":"#d3d3d3"});
            },
            "mouseout" : function(){ // 선택한 요소에 마우스 포인터를 벗어날 때 이벤트를 발생
                 // 선택한 요소가 지정된 요소를 벗어나면 배경 색상을 원래대로 변경
                $(".list-group li").eq(index-1).css({"background":"none"});
            },
            // "click" : function(){ //마우스 이벤트 등록 메서드 : click 이벤트가 발생하여 이벤트 핸들러가 실행(이벤트는 익명 함수 형태로 표현)
            //     clickProduct($(this).data("id"));
            // }  

        });
    });
    
    $("#write-form").on('submit', function(){
        let content = $(".ql-editor").html();
        $("#content").html(content);
        return true;
    });

    
    $(".list-group-item-action").click(function () {
        let product_title = $(this).attr('id');
        $.get("/detail?title=" + product_title)
            .then(function (result) {
                $("#detailModalLabel").text(result.title);                
                $("#detailcontent").html(result.content);                
                $("#imagepreview").attr("src", "/static/"+result.image);
                $("#detailModal").modal('show');
            });
    });

    

    

});