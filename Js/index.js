/**
 * Calcul la position de l'élémént parrapport au haut de la page
 * @param {HTMLElement} element 
 * @returns {number}
 */

function offsetTop(element, acc = 0){
    if(!element.offsetParent) {
        return offsetTop(element.offsetParent, acc + element.offsetTop);
    }
    return acc + element.offsetTop;
}


class Parallax {
    /**
     * @param {HTMLElement} element 
     */
    constructor(element) {
        this.element = element;
        this.ratio = parseFloat(element.dataset.parallax);
        this.onScroll = this.onScroll.bind(this);
        document.addEventListener("scroll", this.onScroll);
    }

    onScroll (){
        const screenY = window.scrollY + window.innerHeight / 2;
        const elementY = offsetTop(this.element) + this.element.offsetHeight / 2;
        const diffY = elementY - screenY;
        this.element.style.setProperty('transform', `translateY(${diffY * this.ratio}px`);
        if ((diffY* this.ratio)  > -10 ){
            this.element.style.setProperty('transform', `translateY(0px)`);
        }
        
    }

    /**
     * @returns {Parallax[]}
     */
    static blind(){
        return Array.from(document.querySelectorAll("[data-parallax]")).map(
            (element) => {
                return new Parallax(element);
        })
    }

}

class Parallax2 {
    /**
     * @param {HTMLElement} element 
     */
    constructor(element) {
        this.element = element;
        this.ratio = parseFloat(element.dataset.parallax);
        this.onScroll = this.onScroll.bind(this);
        const observer = new IntersectionObserver(this.onIntersection)
        observer.observe(element)
    }

    onIntersection(entries) {
        for (const entry of entries) {
            if (entry.isIntersecting){
                document.addEventListener("scroll", this.onScroll);
            }
            else{
                document.removeEventListener("scroll", this.onScroll);
            }
        }
    }

    onScroll (){
        const screenY = window.scrollY + window.innerHeight / 2;
        const elementY = offsetTop(this.element) + this.element.offsetHeight / 2;
        const diffY = elementY - screenY;;
        this.element.style.setProperty('transform', `translateY(${diffY * -1 *  this.ratio}px`);   
    }

    /**
     * @returns {Parallax[]}
     */
    static blind(){
        return Array.from(document.querySelectorAll("[data-parallax2]")).map(
            (element) => {
                return new Parallax2(element);
        })
    }

}

Parallax.blind();
Parallax2.blind();