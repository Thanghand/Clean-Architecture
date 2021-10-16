export class TransformUtil {
    public static transformArrayObjectIDToMapObject<T>(objects: T[]): Map<string, T> {
        const hasmap: Map<string, T> = new Map();
        objects.forEach(d => {
            if (d['id']) {
                const id = d['id'].toString();
                if (!hasmap.has(id)) {
                    hasmap.set(id, d);
                }
            }
           
        })
        return hasmap;
    }

    public static transformArrayStringToMap(arrays: string[]): Map<string, string> {
        const hashmap: Map<string, string> = new Map();
        arrays.forEach(d => {
            if (!hashmap.has(d)) {
                hashmap.set(d, d);
            }
        })
        return hashmap;
    }

}