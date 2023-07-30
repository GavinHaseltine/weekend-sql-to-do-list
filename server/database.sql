CREATE TABLE "toDoItems" (
	"id" serial primary key,
	"itemName" VARCHAR(100) not null,
	"itemDone" BOOLEAN DEFAULT FALSE
	);
	INSERT INTO "toDoItems"
	   ("itemName", "itemDone")
	   VALUES
	   ('sampleTask','false');