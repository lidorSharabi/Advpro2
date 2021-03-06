﻿using MazeLib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace Server
{
    /// <summary>
    /// respondible for the moves in the multiplayers game
    /// </summary>
    class PlayMazeCommand : ICommand
    {
        /// <summary>
        /// the model to perform the operation
        /// </summary>
        private IModel model;
        /// <summary>
        /// Ctor
        /// </summary>
        /// <param name="model"></param>
        public PlayMazeCommand(IModel model)
        {
            this.model = model;
        }
        /// <summary>
        /// Executes the command of playing a move in the multiplayer maze and
        /// applying the matching function in the model section
        /// </summary>
        /// <param name="args"></param>
        /// <param name="client"></param>
        /// <returns></returns>
        public string Execute(string[] args, TcpClient client)
        {
            string move;
            try
            {
                move = args[0];
                if (!(move.ToLower().Equals("up") || move.ToLower().Equals("down") || move.ToLower().Equals("left") || move.ToLower().Equals("right")))
                {
                    return "No such play move exsits";
                }
            }
            catch (Exception)
            {
                return "Error in parameter for play command maze";
            }
            return model.PlayMove(move, client);           
        }
    }
}
