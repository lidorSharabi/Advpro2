﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MazeLib;
using System.Net.Sockets;

namespace AdvProgWebApp.Models
{
    /// <summary>
    /// interface of the model
    /// </summary>
    public interface IModel
    {
        /// <summary>
        /// generating a new private maze
        /// </summary>
        /// <param name="name"></param>
        /// <param name="rows"></param>
        /// <param name="cols"></param>
        /// <returns></returns>
        Maze GenerateMaze(string name, int rows, int cols);
        /// <summary>
        /// solving a private maze
        /// </summary>
        /// <param name="name"></param>
        /// <param name="algorithm"></param>
        /// <returns></returns>
        string SolveMaze(string name, int algorithm);
        /// <summary>
        /// list of all multiplayers maze that a client can join
        /// </summary>
        /// <returns></returns>
        string[] MazeList();
        /// <summary>
        /// starting a new multiplayer maze
        /// </summary>
        /// <param name="name"></param>
        /// <param name="rows"></param>
        /// <param name="cols"></param>
        /// <param name="client"></param>
        /// <returns></returns>
        Maze MazeStart(string name, int rows, int cols, TcpClient client);
        /// <summary>
        /// joining a multiplayer maze that was started by another client
        /// </summary>
        /// <param name="name"></param>
        /// <param name="client"></param>
        /// <returns></returns>
        Maze JoinMaze(string name, TcpClient client);
        /// <summary>
        /// playing a move in the multiplayer maze (up, down, right, left)
        /// </summary>
        /// <param name="move"></param>
        /// <param name="client"></param>
        /// <returns></returns>
        string PlayMove(string move, TcpClient client);
        /// <summary>
        /// closing a multiplayer maze
        /// </summary>
        /// <param name="name"></param>
        /// <param name="client"></param>
        /// <returns></returns>
        string CloseMultiPlayerGame(string name, TcpClient client);
    }
}
