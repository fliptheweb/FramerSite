# Made with Framer
# by Koen Bok
# www.framerjs.com

bg = new BackgroundLayer backgroundColor: "#A793E8"
container = new Layer backgroundColor: "transparent", clip:false, width:600, height: 600
container.center()
window.onresize = 
rows = 4
cols = 4

size = 60
margin = 50
ballCurve = "spring(300,20,0)"
startDelta = 200

[1..rows].map (a) ->
	[1..cols].map (b) ->
		ball = new Layer
			x: b * (size + margin)
			y: a * (size + margin) + startDelta
			backgroundColor: "white"
			width:  size 
			height: size
			opacity: 0
			borderRadius: 100
			superLayer: container

		R1 = 200 / cols * a 
		G1 = 200 / rows * b 
		B1 = 255 
		
		ball.animate 
			properties:
				y: a * (size + margin)
				opacity: 1
			curve: ballCurve
			delay: 0.05 * a + 0.05 * b