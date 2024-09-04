export class Task {
    id: string;
    name: string;
    createDate: string;
    dueDate: string;
    description: string;

    constructor(id: string, name: string, createDate: string, dueDate: string, description: string) {
        this.id = id;
        this.name = name;
        this.createDate = createDate;
        this.dueDate = dueDate;
        this.description = description;
    }

    public static uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }
}