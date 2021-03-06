﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AdvProgWebApp.Models;
using MazeLib;
using Newtonsoft.Json.Linq;

namespace AdvProgWebApp.Controllers
{
    public class SingleController : ApiController
    {
        IModel model = new Model();

        // GET api/<controller>
        public IHttpActionResult GetMaze(string name, int cols, int rows)
        {
            Maze maze = model.GenerateMaze(name, rows, cols);
            JObject jmaze = JObject.Parse(maze.ToJSON());
            return Ok(jmaze);
        }

    }
}