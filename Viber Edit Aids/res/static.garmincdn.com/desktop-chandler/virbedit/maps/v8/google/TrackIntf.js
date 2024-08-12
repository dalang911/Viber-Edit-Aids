/**
 * 拖拽开始时触发
 *
 * @returns 无返回值
 */
function DragStarted() {
    updateDebugInfo('DragStarted:');
    // try {
    //     if (window.external) { window.external.DragStartHandler(); }
    //     else { console.DragStartHandler(); }
    // }
    // catch (err) { }
}
/**
 * 拖拽结束时的回调函数
 */
function DragEnded() {
    updateDebugInfo('DragEnded:');
    // try {
    //     if (window.external) { window.external.DragEndHandler(); }
    //     else { console.DragEndHandler(); }
    // }
    // catch (err) { }
}
/**
 * 获取最接近轨道的位置
 *
 * @param aLat 纬度值
 * @param aLon 经度值
 * @returns 返回最接近轨道的位置
 */
function GetClosestPositionOnTrack(aLat, aLon) {
    updateDebugInfo('GetClosestPositionOnTrack:');
    // try {
    //     if (window.external) { return window.external.GetClosestPositionOnTrack(aLat, aLon); }
    //     else { return console.GetClosestPositionOnTrack(aLat, aLon); }
    // }
    // catch (err) { console.log(err.toString()); }
}
/**
 * 标记位置改变事件处理函数
 *
 * @param aLat 纬度值
 * @param aLon 经度值
 * @returns 无返回值
 */
function MarkerPositionChanged(aLat, aLon) {
    updateDebugInfo('MarkerPositionChanged:');
    // try {
    //     if (window.external) { return window.external.MarkerPositionChanged(aLat, aLon); }
    //     else { return console.MarkerPositionChanged(aLat, aLon); }
    // }
    // catch (err) { console.log(err.toString()); }
}
/**
 * 地图类型改变时触发该函数
 *
 * @param aMap 地图对象
 * @returns 无返回值
 */
function MapTypeChanged(aMap) {
    // updateDebugInfo('MapTypeChanged:');
    // try {
    //     if (window.external) { window.external.MapTypeChanged(aMap); }
    //     else { console.MapTypeChanged(aMap); }
    // }
    // catch (err) { }
}
/**
 * 地图初始化完成后的回调函数
 *
 * @returns 无返回值
 */
function MapDidInitialize() {
    updateDebugInfo('MapDidInitialize:');
    // try {
    //     if (window.external) { window.external.MapDidInitialize(); }
    //     else { console.MapDidInitialize(); }
    // }
    // catch (err) { }
}
/**
 * 设置轨迹
 *
 * @param aLatList 纬度列表
 * @param aLngList 经度列表
 * @returns 无返回值
 */
function SetTrack(aLatList, aLngList) {
    updateDebugInfo('SetTrack:');
    // SetTrackImpl(aLatList, aLngList);
}
/**
 * 设置轨迹线段
 *
 * @param aLatList 纬度列表
 * @param aLngList 经度列表
 * @returns 无返回值
 */
function SetTrackSegment(aLatList, aLngList) {
    updateDebugInfo('SetTrackSegment:');
    //SetTrackSegmentImpl(aLatList, aLngList);
}
/**
 * 清除轨迹段
 *
 * @returns 无返回值
 */
function ClearTrackSegment() {
    updateDebugInfo('ClearTrackSegment:');
    // if (!mTrack) { 
    //     return; 
    // } else { 
    //     //mTrack.ClearSegment(); 
    // }
}
/**
 * 添加轨迹
 *
 * @param aLatList 纬度列表
 * @param aLngList 经度列表
 * @returns 无返回值
 */
function AddTrack(aLatList, aLngList) {
    updateDebugInfo('AddTrack:');
    // AddTrackImpl(aLatList, aLngList);
}
/**
 * 显示轨迹
 *
 * @returns 无返回值
 */
function ShowTrack() {
    updateDebugInfo('ShowTrack:');
    // if (!mTrack) { return; }
    // mTrack.ShowTrack();
}
/**
 * 添加背景轨迹
 *
 * @param aLatList 纬度列表
 * @param aLngList 经度列表
 */
function AddBackgroundTrack(aLatList, aLngList) {
    updateDebugInfo('AddBackgroundTrack:');
    // AddBackgroundTrackImpl(aLatList, aLngList);
}
/**
 * 清除背景音轨
 *
 * @returns 无返回值
 */
function ClearBackgroundTracks() {
    updateDebugInfo('ClearBackgroundTracks:');
    // if (!mTrack) { return; }
    //mTrack.ClearBackgroundTracks();
}
/**
 * 设置标记位置
 *
 * @param aLat 纬度
 * @param aLon 经度
 * @returns 无返回值
 */
function SetMarkerPosition(aLat, aLon) { 
    updateDebugInfo('SetMarkerPosition:');移动事件
    // SetMarkerPositionImpl(aLat, aLon); 
}
/**
 * 隐藏标记点
 */
function HideMarker() {
    updateDebugInfo('HideMarker:');
    // if (!mTrack) { return; }
    // //mTrack.HideMarker();
}
/**
 * 隐藏轨迹
 *
 * @returns 无返回值
 */
function HideTrack() {
    updateDebugInfo('HideTrack:');
    // if (!mTrack) { return; }
    //mTrack.HideTrack();
}
/**
 * 设置标记是否可拖动
 *
 * @param aYesNo 是否可拖动，true 表示可拖动，false 表示不可拖动
 * @returns 无返回值
 */
function SetMarkerDraggable(aYesNo) {
    updateDebugInfo('SetMarkerDraggable:');
    // if (!mTrack) { return; }
    // mTrack.SetMarkerDraggable(aYesNo);
}
/**
 * 设置地图控件标题
 *
 * @param aMapTitle 地图控件标题
 * @param aRoad 路况控件标题
 * @param aBirdsEye 鸟瞰图控件标题
 */
function SetMapControlTitles(aMapTitle, aRoad, aBirdsEye) {
    updateDebugInfo('SetMapControlTitles:');
    // SetMapControlTitlesInternal(aMapTitle, aRoad, aBirdsEye);
}
/**
 * 设置地图类型
 *
 * @param aMapType 地图类型
 */
function SetMapType(aMapType) {
    updateDebugInfo('SetMapType:');
    //SetMapTypeInternal(aMapType);
}