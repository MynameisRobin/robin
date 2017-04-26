import {EventProxy} from './eventproxy'
import * as _ from 'underscore';
export class EventManager {
    private static GraphData : any[] = [];
    private static CurrentIndex : number = 0;
    private static Graph : joint.dia.Graph;
    private static Paper : joint.dia.Paper;
    static init(graph : joint.dia.Graph, paper?: joint.dia.Paper) {
        if (!graph) {
            return;
        }

        this.Graph = graph;
        this.Paper = paper;
        let topThis = this;
        this.Push();

        this
            .Paper
            .on("cell:pointerup", function (cellview : joint.dia.CellView) {
                if (cellview.model.hasChanged()) {}
                topThis.Push();
            })
        this
            .Graph
            .on("remove", (cell : joint.dia.Cell, collection : any, options : any) => {
                if (options.clear) {
                    return;
                }
                topThis.Push();
            });
        this
            .Graph
            .on("add", (cell : joint.dia.Cell, collection : any, options : any) => {
                if (cell.isLink()) {
                    return;
                }
                topThis.Push();
            });
    }
    static Push() {
        let data = this
            .Graph
            .toJSON()
        if (_.isEqual(this.GraphData[this.CurrentIndex], data)) {
            return;
        }
        if (this.CurrentIndex < this.GraphData.length - 1) {
            this
                .GraphData
                .splice(this.CurrentIndex + 1);
        }
        this
            .GraphData
            .push(data);
        this.CurrentIndex = this.GraphData.length - 1;
    }
    static Undo() {
        this.CurrentIndex -= 1;
        if (this.CurrentIndex < 0) {
            this.CurrentIndex += 1;
            return;
        }
        let nextData = this.GraphData[this.CurrentIndex];
        this
            .Graph
            .clear();
        this
            .Graph
            .fromJSON(nextData);
        EventProxy.trigger("update_view");
    }
    static Redo() {
        this.CurrentIndex += 1;
        if (this.CurrentIndex >= this.GraphData.length) {
            this.CurrentIndex -= 1;
            return;
        }

        let nextData = this.GraphData[this.CurrentIndex];
        this
            .Graph
            .clear();
        this
            .Graph
            .fromJSON(nextData);
        EventProxy.trigger("update_view");
    }
}
