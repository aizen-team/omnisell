import { createServer, Model, Factory, Response } from "miragejs";

export function makeServer({ environment = "development" } = {}) {
    return createServer({
        environment,

        models: {
            user: Model,
        },

        seeds(server) {
            server.create("user", {
                id: "1",
                name: "John Doe",
                email: "john@example.com",
            });
            server.create("user", {
                id: "2",
                name: "Jane Smith",
                email: "jane@example.com",
            });
        },

        routes() {
            this.namespace = "api";

            this.get("/users", (schema) => {
                return schema.all("user");
            });

            this.get("/users/:id", (schema, request) => {
                const id = request.params.id;
                return schema.find("user", id);
            });

            this.post("/users", (schema, request) => {
                const attrs = JSON.parse(request.requestBody);
                return schema.create("user", attrs);
            });

            this.put("/users/:id", (schema: any, request) => {
                const id = request.params.id;
                const attrs = JSON.parse(request.requestBody);
                const user = schema.find("user", id);

                if (user) {
                    return user.update(attrs);
                }

                return new Response(404, {}, { error: "User not found" });
            });

            this.delete("/users/:id", (schema: any, request) => {
                const id = request.params.id;
                return schema.find("user", id)?.destroy();
            });

            this.get("/error", () => {
                return new Response(404, {}, { error: "Not found" });
            });

            this.passthrough();
        },
    });
}
