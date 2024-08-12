function SetTrackImpl(aLatList, aLngList) { //加载当前点
    updateDebugInfo('1SetTrackImpl:');
    var theLats = $.parseJSON(aLatList); 
    var theLngs = $.parseJSON(aLngList); 
    if (!mTrack) { 
        mTrack = new Track(mMap, theLats, theLngs); 
    } else { 
        mTrack.UpdateTrack(theLats, theLngs); 
    }
}
function AddTrackImpl(aLatList, aLngList) {
    updateDebugInfo('2AddTrackImpl:');
    var theLats = $.parseJSON(aLatList); var theLngs = $.parseJSON(aLngList); return mTrack.AddTrack(theLats, theLngs);

}
function SetTrackSegmentImpl(aLatList, aLngList) {
    updateDebugInfo('3SetTrackSegmentImpl:');
    if (!mTrack) { return; }
    var theLats = $.parseJSON(aLatList); 
    var theLngs = $.parseJSON(aLngList); 
    mTrack.SetSegment(theLats, theLngs);
}
function AddBackgroundTrackImpl(aLatList, aLngList) {
    updateDebugInfo('4AddBackgroundTrackImpl:');
    if (!mTrack) {
        updateDebugInfo('mTrack不存在');
        return;
    }
    var theLats = $.parseJSON(aLatList);
    var theLngs = $.parseJSON(aLngList);
    updateDebugInfo('执行AddBackgroundTrack');
    mTrack.AddBackgroundTrack(theLats, theLngs);
}
function SetMarkerPositionImpl(aLat, aLon) {
    //updateDebugInfo('5SetMarkerPositionImpl:');
    if (!mTrack) { return; }
    mTrack.SetMarkerPosition(aLat, aLon);
}
var Track = (function () {
    function Track(aMap, aLats, aLngs) {
        var theLatLngList = []; 
        for (i = 0; i < aLats.length; i++) { 
            theLatLngList.push(new google.maps.LatLng(aLats[i], aLngs[i])); 
        }
        this.mLatLngList = theLatLngList; 
        this.mMap = aMap; 
        this.mExtraPolylines = []; 
        this.mSegmentLatLngList = []; 
        this.mLatLngBounds = new google.maps.LatLngBounds(); 
        for (i = 0; i < this.mLatLngList.length; i++) { 
            this.mLatLngBounds.extend(this.mLatLngList[i]); 
        }
        this.mPolyline = new google.maps.Polyline({ 
            path: this.mLatLngList, 
            map: this.mMap, 
            clickable: false, 
            visible: false, 
            draggable: false, 
            editable: false, 
            strokeColor: 'black', 
            strokeOpacity: 1, 
            strokeWeight: 4, 
            zIndex: 1 
        }); 
        this.mSegmentPolyline = new google.maps.Polyline({ 
            map: this.mMap, 
            clickable: false, 
            visible: false, 
            draggable: false, 
            editable: false, 
            strokeColor: 'black', 
            strokeOpacity: 1, 
            strokeWeight: 4, 
            zIndex: 2 
        }); 
        this.mBackgroundPolylines = []; var image = { 
            url: "../images/marker.png", 
            origin: new google.maps.Point(0, 0), 
            anchor: new google.maps.Point(26, 26), 
            scaledSize: new google.maps.Size(50, 50) 
        }
        this.mMarker = new google.maps.Marker({ 
            position: this.mLatLngList[0], 
            map: this.mMap, 
            icon: image, 
            crossOnDrag: false, 
            visible: false, 
            draggable: true, 
            clickable: false, 
            zIndex: 3 
        }); 
        image = { 
            url: "../images/start.png", 
            origin: new google.maps.Point(0, 0), 
            anchor: new google.maps.Point(8, 8), 
            scaledSize: new google.maps.Size(15, 15) 
        }
        this.mStartMarker = new google.maps.Marker({ 
            position: this.mLatLngList[0], 
            map: this.mMap, 
            icon: image, 
            visible: false, 
            draggable: false, 
            clickable: false, 
            zIndex: 3 
        }); 
        image = { 
            url: "../images/end.png", 
            origin: new google.maps.Point(0, 0), 
            anchor: new google.maps.Point(14, 14), 
            scaledSize: new google.maps.Size(28, 28) 
        }
        this.mEndMarker = new google.maps.Marker({ 
            position: this.mLatLngList[this.mLatLngList.length - 1], 
            map: this.mMap, 
            icon: image, 
            visible: false, 
            draggable: false, 
            clickable: false, 
            zIndex: 3 
        }); 
        this.mLastPos = new google.maps.LatLng(0, 0); 
        google.maps.event.addListener(this.mMarker, 'dragstart', function (e) { DragStarted(); }); 
        google.maps.event.addListener(this.mMarker, 'dragend', function (e) { DragEnded(); });
        var that = this; 
        google.maps.event.addListener(this.mMarker, 'drag', function (e) {
            try {
                var theClosestPos = $.parseJSON(GetClosestPositionOnTrack(e.latLng.lat(), e.latLng.lng())); if (theClosestPos.length >= 2) { var theNewPos = new google.maps.LatLng(theClosestPos[0], theClosestPos[1]); that.mLastPos = theNewPos; that.mMarker.setPosition(theNewPos); }
                else { that.mMarker.setPosition(that.mLastPos); }
                MarkerPositionChanged(that.mLastPos.lat(), that.mLastPos.lng());
            }
            catch (err) { console.log(err.toString()); }
        });
    }
    Track.prototype.AddTrack = function (aLats, aLngs) {
        var theLatLngList = [];
        for (var i = 0; i < aLats.length; i++) {
            theLatLngList.push(new google.maps.LatLng(aLats[i], aLngs[i]));
        }
        this.mLatLngList = this.mLatLngList.concat(theLatLngList);
        for (i = 0; i < theLatLngList.length; i++) {
            this.mLatLngBounds.extend(theLatLngList[i]);
        }
        var thePolyline = new google.maps.Polyline({
            path: theLatLngList,
            map: this.mMap,
            clickable: false,
            visible: true,
            draggable: false,
            editable: false,
            strokeColor: 'black',
            strokeOpacity: 1,
            strokeWeight: 4,
            zIndex: 1
        });
        this.mExtraPolylines.push(thePolyline);
        this.mMap.fitBounds(this.mLatLngBounds);
        this.mEndMarker.setPosition(theLatLngList[theLatLngList.length - 1]);
    };
    
    Track.prototype.UpdateTrack = function (aLats, aLngs) {
        var theLatLngList = [];
        for (var i = 0; i < this.mExtraPolylines.length; i++) {
            this.mExtraPolylines[i].setMap(null);
        }
        this.mExtraPolylines = [];
        this.ClearBackgroundTracks();
        for (i = 0; i < aLats.length; i++) {
            theLatLngList.push(new google.maps.LatLng(aLats[i], aLngs[i]));
        }
        this.mLatLngList = theLatLngList;
        this.mLatLngBounds = new google.maps.LatLngBounds();
        for (i = 0; i < this.mLatLngList.length; i++) {
            this.mLatLngBounds.extend(this.mLatLngList[i]);
        }
        this.mPolyline.setPath(this.mLatLngList);
        this.mStartMarker.setPosition(this.mLatLngList[0]);
        this.mEndMarker.setPosition(this.mLatLngList[this.mLatLngList.length - 1]);
        this.theLastPos = this.mLatLngList[0];
        this.mMap.fitBounds(this.mLatLngBounds);
    };
    
    Track.prototype.SetSegment = function (aLats, aLngs) {
        var numOfPoints = (aLats.length <= aLngs.length) ? aLats.length : aLngs.length;
        var theLatLngList = [];
        for (var i = 0; i < numOfPoints; i++) {
            theLatLngList.push(new google.maps.LatLng(aLats[i], aLngs[i]));
        }
        this.mSegmentLatLngList = theLatLngList;
        this.mPolyline.setOptions({ strokeColor: "gray" });
        this.mSegmentPolyline.setPath(this.mSegmentLatLngList);
        this.mSegmentPolyline.setVisible(true);
    };
    
    Track.prototype.ClearSegment = function () {
        updateDebugInfo('ClearSegment:');
        this.mSegmentLatLngList = [];
        this.mSegmentPolyline.setVisible(false);
        this.mPolyline.setOptions({ strokeColor: "black" });
    };
    
    Track.prototype.AddBackgroundTrack = function (aLats, aLngs) {
        updateDebugInfo('Track.prototype.AddBackgroundTrack:');
        var numOfPoints = (aLats.length <= aLngs.length) ? aLats.length : aLngs.length;
        var theLatLngList = [];
        for (var i = 0; i < numOfPoints; i++) {
            var theGLatLng = new google.maps.LatLng(aLats[i], aLngs[i]);
            theLatLngList.push(theGLatLng);
            this.mLatLngBounds.extend(theGLatLng);
        }
        var theBgPolyline = new google.maps.Polyline({
            path: theLatLngList,
            map: this.mMap,
            clickable: false,
            visible: true,
            draggable: false,
            editable: false,
            strokeColor: 'red',
            strokeOpacity: 1,
            strokeWeight: 4,
            zIndex: 0
        });
        this.mBackgroundPolylines.push(theBgPolyline);
        this.mMap.fitBounds(this.mLatLngBounds);
    };
    
    Track.prototype.ClearBackgroundTracks = function () {
        for (var i = 0; i < this.mBackgroundPolylines.length; i++) {
            this.mBackgroundPolylines[i].setMap(null);
        }
        this.mBackgroundPolylines = [];
    };
    
    Track.prototype.SetMarkerPosition = function (aLat, aLon) {
        this.mMarker.setVisible(true);
        this.mMarker.setPosition(new google.maps.LatLng(aLat, aLon));
        if (this.mMap.getBounds() != null && !this.mMap.getBounds().contains(this.mMarker.getPosition())) {
            this.mMap.panTo(this.mMarker.getPosition());
        }
    };
    
    Track.prototype.HideMarker = function () {
        this.mMarker.setVisible(false);
    };
    
    Track.prototype.ShowTrack = function () {
        //var that = this; // 保存 this 的引用
        //var objString = that.toString();
        //updateDebugInfo(this.mExtraPolylines.length);
        updateDebugInfo('Track.prototype.ShowTrack:');
        //this.mMap.fitBounds(this.mLatLngBounds);
        //this.mPolyline.setVisible(true);
        //this.mStartMarker.setVisible(true);
        //this.mEndMarker.setVisible(true);
        // for (var i = 0; i < this.mExtraPolylines.length; i++) {
        //     this.mExtraPolylines[i].setVisible(true);
        // }
    };
    
    Track.prototype.HideTrack = function () {
        updateDebugInfo('Track-HideTrack:');
        this.mPolyline.setVisible(false);
        this.mMarker.setVisible(false);
        this.mStartMarker.setVisible(false);
        this.mEndMarker.setVisible(false);
        for (i = 0; i < this.mExtraPolylines.length; i++) {
            this.mExtraPolylines[i].setVisible(false);
        }
    };
    
    Track.prototype.SetMarkerDraggable = function (canDrag) {
        this.mMarker.setDraggable(canDrag);
    };
    
    return Track;
    
})();


function findClosest(latLng, latLngList) {
    var theIndex = 0; var theDistance = 100000000; for (i = 0; i < latLngList.length; i++) {
        var tempDistance = google.maps.geometry.spherical.computeDistanceBetween(latLng, latLngList[i]); if (tempDistance < theDistance) { theDistance = tempDistance; theIndex = i; }
    }
    return latLngList[theIndex];
}