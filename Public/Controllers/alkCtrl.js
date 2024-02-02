app.controller('alkCtrl', function($scope, ngNotify, $rootScope){
$scope.editMode = false;
$scope.alk = {};
$scope.alks = [];
$scope.getItems = function(){
    axios.get($rootScope.serverUrl+'/db/employees', $rootScope.token).then(res => {
        $scope.alks = res.data;
        $rootScope.Alks = $scope.alks;
        $scope.$apply();
    });
}
$scope.getItems()
$scope.insert = function(){
    if ($scope.alk.name == null || $scope.alk.address == null || $scope.alk.position == null || $scope.alk.pricePerHour == null){
        ngNotify.set('Adj meg minden adatot!', 'error');
    }else{
        let data = {
            name: $scope.alk.name,
            address: $scope.alk.address,
            position: $scope.alk.position,
            pricePerHour: $scope.alk.pricePerHour
        }
        axios.post($rootScope.serverUrl+'/db/employees', data, $rootScope.token).then(
            res =>{
                ngNotify.set('Alkalmazott sikeresen hozzáadva!', 'success');
                $scope.getItems();
                $scope.alk = {};
            }
        );
    }
}
$scope.update = function(id){
    let data = {
        name: $scope.alk.name,
        address: $scope.alk.address,
        position: $scope.alk.position,
        pricePerHour: $scope.alk.pricePerHour
    }
    axios.patch($rootScope.serverUrl+'/db/employees/ID/eq/'+id, data, $rootScope.token).then(res=>{
        ngNotify.set('Sikeres frissítés!', 'success');
        $scope.getItems();
        $scope.alk = {};
        $scope.editMode = false;
    });
}

$scope.delete = function(id){
    if (confirm('Are you sure you want to delete this item?')){
        axios.delete($rootScope.serverUrl+'/db/employees/ID/eq/'+id, $rootScope.token).then(res=>{
            ngNotify.set('Sikeres törlés!', 'success');
            $scope.getItems();
            $scope.alk = {};
            $scope.editMode = false;
        });
    }
}


// menüpont kiválasztása a táblázatban
$scope.selectItem = function(id){
    $scope.editMode = true;
    $scope.alk = $scope.alks.find(item => item.ID == id);
}

$scope.cancel = function(){
    $scope.editMode = false;
    $scope.navitem = {};
}


})

