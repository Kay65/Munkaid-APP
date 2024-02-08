app.controller('midoCtrl', function($scope, ngNotify, $rootScope){
    $scope.editMode = false;
    $scope.mido = {};
    $scope.midok = [];
    $scope.getItems = function(){
        axios.get($rootScope.serverUrl+'/db/worktimes', $rootScope.token).then(res => {
            $scope.midok = res.data;
            $rootScope.Midok = $scope.midok;
            $scope.$apply();
        });
    }
    $scope.getItems()
    axios.get($rootScope.serverUrl+'/db/employees', $rootScope.token).then(res => {
        $scope.alks = res.data;
        $rootScope.Alks = $scope.alks;
        $scope.$apply();
    });
    $scope.insert = function(){
        if ($scope.mido.name == null || $scope.mido.date == null || $scope.mido.start == null || $scope.mido.end == null){
            ngNotify.set('Adj meg minden adatot!', 'error');
        }else{
            let data = {
                empID: $scope.mido.name,
                date: $scope.mido.date,
                start: $scope.mido.start,
                end: $scope.mido.end
            }
            axios.post($rootScope.serverUrl+'/db/worktimes', data, $rootScope.token).then(
                res =>{
                    ngNotify.set('Munkaidő sikeresen hozzáadva!', 'success');
                    $scope.getItems();
                    $scope.mido = {};
                }
            );
        }
    }
    $scope.update = function(id){
        let data = {
            empID: $scope.mido.name,
            date: $scope.mido.date,
            start: $scope.mido.start,
            start: $scope.mido.end
        }
        axios.patch($rootScope.serverUrl+'/db/worktimes/ID/eq/'+id, data, $rootScope.token).then(res=>{
            ngNotify.set('Sikeres frissítés!', 'success');
            $scope.getItems();
            $scope.mido = {};
            $scope.editMode = false;
        });
    }
    
    $scope.delete = function(id){
        if (confirm('Are you sure you want to delete this item?')){
            axios.delete($rootScope.serverUrl+'/db/worktimes/ID/eq/'+id, $rootScope.token).then(res=>{
                ngNotify.set('Sikeres törlés!', 'success');
                $scope.getItems();
                $scope.mido = {};
                $scope.editMode = false;
            });
        }
    }
    function toTime(timeString){
        var timeTokens = timeString.split(':');
        return new Date(1970,0,1, timeTokens[0], timeTokens[1], timeTokens[2]);
    }
    
    
    // menüpont kiválasztása a táblázatban
    $scope.selectItem = function(id){
        $scope.editMode = true;
        $scope.mido = $scope.midok.find(item => item.ID == id);
        $scope.mido.date =new Date( moment($scope.mido.date).format("YYYY-MM-DD"))
        starttime=toTime($scope.mido.start)
        endtime=toTime($scope.mido.end)
        $scope.mido.start =new Date( starttime)
        $scope.mido.end =new Date( endtime )
        console.log($scope.mido)
    }
    
    $scope.cancel = function(){
        $scope.editMode = false;
        $scope.mido = {};
    }


    })