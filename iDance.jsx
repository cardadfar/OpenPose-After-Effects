#include "json2.js"

var thisComp = app.project.activeItem;

var script_file = File($.fileName); 
var script_file_path = script_file.path; 

var file_to_read = File(script_file_path + "/output2.json");

var content;
if(file_to_read !== false){
     file_to_read.open('r');
     response = file_to_read.read();
     content =  JSON.parse(response);
     clear_layers();
     animate(content);
     file_to_read.close(); 
}

function clear_layers() {
    var len = thisComp.numLayers;
    for(var i = 0; i < len; i++)
        thisComp.layer(1).remove();
}

function animate(content) {
        var fps = 20;
        var parts = ["left_wrist", "left_elbow", "left_shoulder", "right_shoulder", "right_elbow", "right_wrist", "left_foot", "left_knee", "left_hip", "right_hip", "right_knee", "right_foot", "nose", "neck"];
        var joints = ["left_wrist_elbow", "left_elbow_shoulder", "left_right_shoulder", "right_elbow_shoulder", "right_wrist_elbow", "space", "left_foot_knee", "left_knee_hip", "left_right_hip", "right_knee_hip", "right_foot_knee", "space2", "nose_neck"];
        var partsLen = parts.length;
        
        new_rectangle("body");
        
        for(var i = 0; i < joints.length; i++)
            new_line(joints[i]);
        
        for(var i = 0; i < partsLen; i++)
            new_ellipse(parts[i]);
            
        new_ellipse("left_ear");
        new_ellipse("right_ear");
        
        new_rectangle("ipod");
        
        new_line("cord");
        new_line("left_cord");
        new_line("right_cord");
        
        var start = 465;
        var end = 972;
        var step = 1;
        var totalStep = 0;
        
        var right_alive_x = 0;
        var right_alive_y = 0;
        
        for(var h = start; h < end; h++) {
            step = content[0][String(h)]["numPoses"];
            for(var i = 0; i < step; i++) {
                if(content[0][String(h)][String(i)] !== undefined) {
                    
                    var x1 = content[0][String(h)][String(i)]["left_shoulder"][0];
                    var y1 = content[0][String(h)][String(i)]["left_shoulder"][1];
                    var x2 = content[0][String(h)][String(i)]["right_shoulder"][0];
                    var y2 = content[0][String(h)][String(i)]["right_shoulder"][1];
                    var x3 = content[0][String(h)][String(i)]["left_hip"][0];
                    var y3 = content[0][String(h)][String(i)]["left_hip"][1];
                    var x4 = content[0][String(h)][String(i)]["right_hip"][0];
                    var y4 = content[0][String(h)][String(i)]["right_hip"][1];
                    var shape = new Shape();
                    shape.vertices = [[x1-960,y1-540],[x2-960,y2-540], [x3-960,y3-540],[x4-960,y4-540]];
                    shape.closed = true;
                    
                    var shapeGroup = thisComp.layer("body").property("Contents");
                    shapeGroup.property(1).property("ADBE Vector Shape").setValueAtTime( (totalStep)/fps, shape);
                    
                    
                    
                    for(var j = 0; j < partsLen; j++) {
                        
                        var x = content[0][String(h)][String(i)][parts[j]][0];
                        var y = content[0][String(h)][String(i)][parts[j]][1];
                        thisComp.layer(parts[j]).position.setValueAtTime( (totalStep)/fps, [x, y]);
                        
                        if(j < partsLen-1 && j !== 5 && j !==11) {
                            
                            var a = content[0][String(h)][String(i)][parts[j+1]][0];
                            var b = content[0][String(h)][String(i)][parts[j+1]][1];
                            
                            var shape = new Shape();
                            shape.vertices = [[x-960,y-540],[a-960,b-540]];
                            shape.closed = false;
                            var shapeGroup = thisComp.layer(joints[j]).property("Contents");
                            shapeGroup.property(1).property("ADBE Vector Shape").setValueAtTime( (totalStep)/fps, shape);
                            }
                        }
                    
                      var x = content[0][String(h)][String(i)]["left_ear"][0];
                      var y = content[0][String(h)][String(i)]["left_ear"][1];
                      thisComp.layer("left_ear").position.setValueAtTime( (totalStep)/fps, [x-10, y]);
                      
                      var x = content[0][String(h)][String(i)]["right_ear"][0];
                      var y = content[0][String(h)][String(i)]["right_ear"][1];
                      thisComp.layer("right_ear").position.setValueAtTime( (totalStep)/fps, [x+10, y]);
                      
                      
                      var x1 = content[0][String(h)][String(i)]["left_wrist"][0];
                      var y1 = content[0][String(h)][String(i)]["left_wrist"][1];
                      var x2 = content[0][String(h)][String(i)]["neck"][0];
                      var y2 = content[0][String(h)][String(i)]["neck"][1]+50;
                      var shape = new Shape();
                      shape.vertices = [[x1-960,y1-540],[(x1+x2)/2-960,y1-530 + 0.1*(x1+x2)/2],[x2-960,y2-540]];
                      shape.closed = false;
                      var shapeGroup = thisComp.layer("cord").property("Contents");
                      shapeGroup.property(1).property("ADBE Vector Shape").setValueAtTime( (totalStep)/fps, shape);
                      
                      
                      var x3_l = content[0][String(h)][String(i)]["left_ear"][0];
                      var y3_l = content[0][String(h)][String(i)]["left_ear"][1];
                      var shape = new Shape();
                      if(content[0][String(h)][String(i)]["left_ear"][0] > 1) {
                        shape.vertices = [[x2-960,y2-540],[x3_l-970,y3_l-540]];
                      }
                      else {
                        x3_l = content[0][String(h)][String(i)]["nose"][0]-25;
                        y3_l = content[0][String(h)][String(i)]["nose"][1]-10;
                        shape.vertices = [[x2-960,y2-540],[x3_l-955,y3_l-540]];
                      }
                      shape.closed = false;
                      var shapeGroup = thisComp.layer("left_cord").property("Contents");
                      shapeGroup.property(1).property("ADBE Vector Shape").setValueAtTime( (totalStep)/fps, shape);
                     
                      
                      var x3_r = content[0][String(h)][String(i)]["right_ear"][0];
                      var y3_r = content[0][String(h)][String(i)]["right_ear"][1];
                      var shape = new Shape();
                      if(content[0][String(h)][String(i)]["right_ear"][0] > 1)
                        shape.vertices = [[x2-960,y2-540],[x3_r-950,y3_r-540]];
                      else {
                        x3_r = content[0][String(h)][String(i)]["nose"][0]+25;
                        y3_r = content[0][String(h)][String(i)]["nose"][1]-10;
                        shape.vertices = [[x2-960,y2-540],[x3_r-955,y3_r-540]];
                      }
                      shape.closed = false;
                      var shapeGroup = thisComp.layer("right_cord").property("Contents");
                      shapeGroup.property(1).property("ADBE Vector Shape").setValueAtTime( (totalStep)/fps, shape);
                      
                      
                      var x = content[0][String(h)][String(i)]["left_wrist"][0];
                      var y = content[0][String(h)][String(i)]["left_wrist"][1];
                      var shapeGroup = thisComp.layer("ipod").property("Contents");
                      thisComp.layer("ipod").position.setValueAtTime( (totalStep)/fps, [x, y]);
                      
                      var x2 = content[0][String(h)][String(i)]["left_elbow"][0];
                      var y3 = content[0][String(h)][String(i)]["left_elbow"][1];
                      var dist = Math.sqrt( (y2-y)*(y2-y) + (x2-x)*(x2-x) ); 
                      var dist_y = Math.abs(y2 - y);
                      var r = (90/3.14)*Math.asin(dist_y/dist)+90;
                      
                      thisComp.layer("ipod").rotation.setValueAtTime( (totalStep)/fps, r);
                    }
                totalStep++;
               }
        }
    
      thisComp.layer("space").remove();
      thisComp.layer("space2").remove();
}

function new_ellipse(name) {
    var shapeLayer = thisComp.layers.addShape();  
    var shapeGroup = shapeLayer.property("Contents").addProperty("ADBE Vector Group");  
    shapeGroup.property("Contents").addProperty("ADBE Vector Shape - Ellipse");  
    var fill = shapeGroup.property("Contents").addProperty("ADBE Vector Graphic - Fill");
    if(name == "left_ear" || name == "right_ear") {
        fill.property("Color").setValue([0,0,0]);
        shapeLayer.scale.setValue([10,15]);
    }
    else {
        fill.property("Color").setValue([255,255,255]);
        if(name == "nose")
            shapeLayer.scale.setValue([65,65]);
        else
            shapeLayer.scale.setValue([25,25]);
    }
    shapeLayer.name = name;
}

function new_rectangle(name) {
    var shapeLayer = thisComp.layers.addShape(); 
    var shapeGroup = shapeLayer.property("ADBE Root Vectors Group"); 
    shapeGroup.addProperty("ADBE Vector Shape - Group"); 
    var fill = shapeGroup.addProperty("ADBE Vector Graphic - Fill");
    
    if(name == "ipod") {
        fill.property("Color").setValue([0,0,0]);

        var x_scl = 10;
        var y_scl = 20;
        
        var shape = new Shape();
        shape.vertices = [[-x_scl,-y_scl],[x_scl,-y_scl],[x_scl,y_scl],[-x_scl,y_scl]];
        shape.closed = true;
    }
    else {
        fill.property("Color").setValue([255,255,255]);
        
        var shape = new Shape();
        shape.vertices = [[0,0],[0,0],[0,0],[0,0]];
        shape.closed = true;
    }
    
    shapeGroup.property(1).property("ADBE Vector Shape").setValue(shape);    
    shapeLayer.name = name;
}

function new_line(name) {
    var shapeLayer = thisComp.layers.addShape(); 
    var shapeGroup = shapeLayer.property("ADBE Root Vectors Group"); 
    shapeGroup.addProperty("ADBE Vector Shape - Group"); 
    var stroke = shapeGroup.addProperty("ADBE Vector Graphic - Stroke");
    if(name == "cord" || name == "left_cord" || name == "right_cord") {
        stroke.property("Stroke Width").setValue([2]);
        stroke.property("Color").setValue([0,0,0]);
    }
    else {
        stroke.property("Stroke Width").setValue([25]);
        stroke.property("Color").setValue([255,255,255]);
    }
    
    
    var shape = new Shape();
    shape.vertices = [[0,0],[0,0]];
    shape.closed = false;
    
    shapeGroup.property(1).property("ADBE Vector Shape").setValue(shape);
    
    shapeLayer.name = name;
}
