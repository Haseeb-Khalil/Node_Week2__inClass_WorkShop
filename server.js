const express = require("express");

const app = express();

const albumsData = [
  {
    albumId: "10",
    artistName: "Beyoncé",
    collectionName: "Lemonade",
    artworkUrl100:
      "http://is1.mzstatic.com/image/thumb/Music20/v4/23/c1/9e/23c19e53-783f-ae47-7212-03cc9998bd84/source/100x100bb.jpg",
    releaseDate: "2016-04-25T07:00:00Z",
    primaryGenreName: "Pop",
    url: "https://www.youtube.com/embed/PeonBmeFR8o?rel=0&amp;controls=0&amp;showinfo=0",
  },
  {
    albumId: "11",
    artistName: "Beyoncé",
    collectionName: "Dangerously In Love",
    artworkUrl100:
      "http://is1.mzstatic.com/image/thumb/Music/v4/18/93/6d/18936d85-8f6b-7597-87ef-62c4c5211298/source/100x100bb.jpg",
    releaseDate: "2003-06-24T07:00:00Z",
    primaryGenreName: "Pop",
    url: "https://www.youtube.com/embed/ViwtNLUqkMY?rel=0&amp;controls=0&amp;showinfo=0",
  },
];

// Getting all albums
app.get("/albums", function (req, res) {
  res.send(albumsData);
});

// Getting an album by ID
app.get("/albums/:albumId", function (req, res) {
  // console.log(req.params.albumId);

  const album = albumsData.find(
    (album) => album.albumId === req.params.albumId
  );

  if (album) {
    res.send(album);
  } else {
    res.status(404);
    res.send({ message: "no such album" });
  }
});

// Adding a new album to the data
app.post("/albums", function (req, res) {
  const newAlbum = req.body;

  if (!newAlbum.albumId) {
    res.status(400);
    res.send({ message: "album ID is missing !" });
  } else if (albumsData.find((album) => album.albumId === newAlbum.albumId)) {
    res.status(400);
    res.send({ message: "an album with similar ID already exists" });
  } else {
    albumsData.push(newAlbum);
    res.status(201);
    res.send(newAlbum);
  }
});

// Deleting an album
app.delete("/albums/:albumId", function (req, res) {
  // Solution-1
  const albumIndex = albumsData.findIndex(
    (album) => album.albumId === req.params.id
  );
  if (albumIndex >= 0) {
    albumsData.splice(albumIndex, 1);
  }

  // Solution-2
  // albumsData = albumsData.filter((album) => album.albumId !== req.params.id);
  // req.status(204);
  // res.end();
});

// Updating an album
app.put("/albums/:albumId", function (req, res) {
  const albumIndex = albumsData.findIndex(
    (album) => album.albumId === req.params.id
  );

  if (albumIndex >= 0) {
    const originalAlbum = albumsData[albumIndex];
    const updatedAlbum = req.body;

    //Validating Data
    if (
      originalAlbum.albumId &&
      updatedAlbum.albumId !== updatedAlbum.albumId
    ) {
      res.status(400);
      res.send({ message: "album IDs do not match" });
    } else {
      albumsData[albumIndex] = { ...originalAlbum, ...updatedAlbum };
      res.send(albumsData[albumIndex]); // sends an object containing  original album array and updated album array
    }
  } else {
    res.status(404);
    res.send({ message: "no such album" });
  }
});

const PORT = 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
