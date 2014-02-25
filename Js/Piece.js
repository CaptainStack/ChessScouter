function Piece(color){
    this.color = color;
    this.captured = false;
}

function Queen(color){
    this.color = color;
    this.material = 9;
}

Queen.prototype = new Piece(this.color);