import Note from "../models/note.js";

export async function getNotes(req, res) {
  try {
    // const notes = await Note.find().sort({ createdAt: -1 }); // Sort by creation date descending
    // Sort by updatedAt if available, otherwise by createdAt
    const notes = await Note.find({ userId: req.user.userId }).aggregate([
      {
        $addFields: {
          sortDate: {
            $cond: {
              if: { $ne: ["$updatedBy", ""] },
              then: "$updatedAt",
              else: "$createdAt",
            },
          },
        },
      },
      { $sort: { sortDate: -1 } },
    ]);
    res.status(200).json(notes);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).send("Internal Server Error");
  }
}

export async function getNoteById(req, res) {
  try {
    const { id } = req.params;
    const note = await Note.findById(id); // get note by ID
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).send("Internal Server Error");
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content, userId: req.user.userId, });
    const addedNote = await newNote.save();
    return res.status(201).json(addedNote);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).send("Internal Server Error");
  }
}

export async function updateNote(req, res) {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(
      {id, userId: req.user.userId},
      { title, content },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    return res.status(200).json({ message: "Note updated successfully" });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).send("Internal Server Error");
  }
}

export async function deleteNote(req, res) {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete({id, userId: req.user.userId});
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).send("Internal Server Error");
  }
}
