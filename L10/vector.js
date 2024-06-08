"use strict";
var L10_Ententeich;
(function (L09_Ententeich) {
    class Vector {
        x;
        y;
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        add(vector) {
            this.x += vector.x;
            this.y += vector.y;
        }
        scale(scalar) {
            this.x *= scalar;
            this.y *= scalar;
        }
        copy() {
            return new Vector(this.x, this.y);
        }
    }
    L09_Ententeich.Vector = Vector;
})(L09_Ententeich || (L09_Ententeich = {}));
//# sourceMappingURL=vector.js.map