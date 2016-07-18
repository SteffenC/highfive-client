
angular.module('ProductController',[])
.controller("ProductController", ['$scope', function($scope){
    $scope.title = "Hey!";

    $scope.products = [
        {
            item:'Beginner snowboard',
            owner: 'Anders',
            prof_pic: 'img/dwight_img.jpg',
            price: 19,
            state: 'Available',
            startdate: new Date('2016', '03', '08'),
            enddate: new Date('2016', '13', '08'),
            cover: 'img/item1.jpg',
            likes: 0,
            dislikes: 0
        },
        {
            item: 'Climbing gear',
            owner: 'Anders',
            price: 50,
            state: 'Available',
            startdate: new Date('2016', '03', '08'),
            enddate: new Date('2016', '13', '08'),
            cover: 'img/item2.jpg',
            likes: 0,
            dislikes: 0
        },
        {
            item: 'Mountainbike downhill',
            owner: 'Anders',
            price: 140,
            state: 'Available',
            startdate: new Date('2016', '03', '08'),
            enddate: new Date('2016', '13', '08'),
            cover: 'img/item3.jpg',
            likes: 0,
            dislikes: 0
        },
        {
            item: '3 Hoverboards',
            owner: 'Anders',
            price: 30,
            state: 'Available',
            startdate: new Date('2016', '03', '08'),
            enddate: new Date('2016', '13', '08'),
            cover: 'img/item4.jpg',
            likes: 0,
            dislikes: 0
        },
        {
            item: 'Surfboards 7-9ft',
            owner: 'Anders',
            price: 8,
            state: 'Available',
            startdate: new Date('2016', '03', '08'),
            enddate: new Date('2016', '13', '08'),
            cover: 'img/item6.jpg',
            likes: 0,
            dislikes: 0
        },
        {
            item: 'Freestyle twintip skis',
            owner: 'Anders',
            price: 50,
            state: 'Available',
            startdate: new Date('2016', '03', '08'),
            enddate: new Date('2016', '13', '08'),
            cover: 'img/item7.jpg',
            likes: 0,
            dislikes: 0
        },
        {
            item: 'Scooter 45cc',
            owner: 'Anders',
            price: 140,
            startdate: new Date('2016', '03', '08'),
            enddate: new Date('2016', '13', '08'),
            cover: 'img/item8.jpg',
            likes: 0,
            dislikes: 0
        },
        {
            item: 'Chewie & HanSolo',
            owner: 'Anders',
            price: 8,
            state: 'Available',
            startdate: new Date('2016', '03', '08'),
            enddate: new Date('2016', '13', '08'),
            cover: 'img/chewie.png',
            likes: 0,
            dislikes: 0
        },
        {
            item: 'Surfboard 6.4ft',
            owner: 'Anders',
            price: 8,
            state: 'Available',
            startdate: new Date('2016', '03', '08'),
            enddate: new Date('2016', '13', '08'),
            cover: 'img/item5.jpg',
            likes: 0,
            dislikes: 0
        }
    ];

    $scope.plusOne = function(index){
        $scope.products[index].likes += 1;
    };
    $scope.minusOne = function(index){
        $scope.products[index].dislikes += 1;
    };

}]);

